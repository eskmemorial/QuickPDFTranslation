<?php
// This is a very simple sample of script of translation server.
// This program uses Azure Translator Text API.
// This code is based on https://github.com/MicrosoftTranslator/Text-Translation-API-V3-PHP.


if (!isset($_GET["text"]) || mb_strlen($_GET["text"]) >= 100) {
    print("ERROR");
    exit();
}



// set your subscription key
putenv("TRANSLATOR_TEXT_SUBSCRIPTION_KEY=*************************************************");

putenv("TRANSLATOR_TEXT_ENDPOINT=https://api.cognitive.microsofttranslator.com");


if (!getenv("TRANSLATOR_TEXT_SUBSCRIPTION_KEY")) {
    throw new Exception("Please set/export the following environment variable: TRANSLATOR_TEXT_SUBSCRIPTION_KEY");
} else {
    $subscription_key = getenv("TRANSLATOR_TEXT_SUBSCRIPTION_KEY");
}
if (!getenv("TRANSLATOR_TEXT_ENDPOINT")) {
    throw new Exception("Please set/export the following environment variable: TRANSLATOR_TEXT_ENDPOINT");
} else {
    $endpoint = getenv("TRANSLATOR_TEXT_ENDPOINT");
}

$path = "/translate?api-version=3.0";


if (!function_exists('com_create_guid')) {
    function com_create_guid()
    {
        return sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0xffff)
        );
    }
}

function Translate($host, $path, $key, $params, $content)
{
    $headers = [
        "Content-type: application/json",
        "Content-length: " . strlen($content),
        "Ocp-Apim-Subscription-Key: $key",
        "X-ClientTraceId: " . com_create_guid(),
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $host . $path . $params);

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    curl_setopt($ch, CURLOPT_POST, true);

    curl_setopt($ch, CURLOPT_POSTFIELDS, $content);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($ch);

    curl_close($ch);

    return $result;
}









if (!isset($_GET["to_lang"])) {
    $params = "&to=ja";
} else {
    $params = "&to=" . $_GET["to_lang"];
}

$requestBody = array(
    array(
        'Text' => $_GET["text"],
    ),
);

$content = json_encode($requestBody);

$result = Translate($endpoint, $path, $subscription_key, $params, $content);
$json = json_decode($result);
print($json[0]->translations[0]->text);
