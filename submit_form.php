<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect form data
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Create email content
    $subject = "New Contact Form Submission";
    $email_content = "Full Name: " . $fullname . "\n";
    $email_content .= "Email: " . $email . "\n";
    $email_content .= "Message:\n" . $message . "\n";

    // Set your personal email address
    $to = "sarthak.chawathe2012@gmail.com";

    // Set headers
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        // If the email is sent successfully, redirect back to the form page with a success message
        header("Location: index.html?status=success");
    } else {
        // If the email failed to send, redirect back to the form page with an error message
        header("Location: index.html?status=error");
    }
} else {
    // If the form is accessed directly without submission, redirect back to the form page
    header("Location: index.html");
}
?>
