<?php
// ── Panda Studios — Contact Form Mailer ──────────────────────
// Receives JSON from contact.html and sends to pandastudios77@gmail.com
// No third-party services. Runs on Hostinger shared hosting.
// ─────────────────────────────────────────────────────────────

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Read and decode JSON body
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

// Fallback: accept regular form POST too
if (!$data) {
    $data = $_POST;
}

// Sanitise inputs
$name    = isset($data['name'])    ? htmlspecialchars(strip_tags(trim($data['name'])))    : '';
$email   = isset($data['email'])   ? htmlspecialchars(strip_tags(trim($data['email'])))   : '';
$message = isset($data['message']) ? htmlspecialchars(strip_tags(trim($data['message']))) : '';

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address']);
    exit;
}

// ── Mail settings ─────────────────────────────────────────────
$to      = 'pandastudios77@gmail.com';
$subject = 'New Brief from ' . $name . ' — Panda Studios Website';

$body  = "You have a new contact form submission from pandastudios.co.ug\n";
$body .= "─────────────────────────────────────\n\n";
$body .= "Name:    " . $name    . "\n";
$body .= "Email:   " . $email   . "\n\n";
$body .= "Message:\n" . wordwrap($message, 70, "\n", true) . "\n\n";
$body .= "─────────────────────────────────────\n";
$body .= "Submitted: " . date('d M Y, H:i') . " (server time)\n";

$headers  = "From: Panda Studios Website <noreply@pandastudios.co.ug>\r\n";
$headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ── Send ──────────────────────────────────────────────────────
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail server error']);
}
?>
