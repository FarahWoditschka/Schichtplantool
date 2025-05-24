<?php

namespace App\Application\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\Address;

class EmailService
{
    public function __construct(
        private MailerInterface $mailer,
        private string $appUrl = 'http://localhost:5173',
        private string $fromEmail = 'noreply@schichtplantool.de',
        private string $fromName = 'Schichtplantool'
    ) {}

    public function sendVerificationEmail(string $to, string $token): void
    {
        $verificationUrl = $this->appUrl . '/verify-email/' . $token;

        $email = (new Email())
            ->from(new Address($this->fromEmail, $this->fromName))
            ->to($to)
            ->subject('Bitte bestätige deine E-Mail-Adresse')
            ->html($this->getVerificationEmailTemplate($verificationUrl));

        $this->mailer->send($email);
    }

    private function getVerificationEmailTemplate(string $verificationUrl): string
    {
        return <<<HTML
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>E-Mail-Bestätigung</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #007bff;">Willkommen beim Schichtplantool!</h1>
                    <p>Vielen Dank für deine Registrierung. Um dein Konto zu aktivieren, klicke bitte auf den folgenden Button:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{$verificationUrl}" 
                           style="background-color: #007bff; color: white; padding: 12px 24px; 
                                  text-decoration: none; border-radius: 4px; display: inline-block;">
                            E-Mail-Adresse bestätigen
                        </a>
                    </div>
                    <p>Falls der Button nicht funktioniert, kannst du auch diesen Link kopieren und in deinen Browser einfügen:</p>
                    <p style="word-break: break-all;">{$verificationUrl}</p>
                    <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
                        Falls du dich nicht registriert hast, kannst du diese E-Mail ignorieren.
                    </p>
                </div>
            </body>
            </html>
        HTML;
    }
} 