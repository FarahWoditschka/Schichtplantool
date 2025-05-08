<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthController extends AbstractController
{
    private $jwtManager;
    private $tokenStorage;

    public function __construct(JWTTokenManagerInterface $jwtManager, TokenStorageInterface $tokenStorage)
    {
        $this->jwtManager = $jwtManager;
        $this->tokenStorage = $tokenStorage;
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        // Hier sollte die Validierung der Anmeldedaten erfolgen
        // Beispiel: Prüfen, ob Benutzer existiert und Passwort korrekt ist
        // In einer echten Anwendung würde hier die User-Entity und ein UserProvider verwendet werden

        if ($username === 'admin' && $password === 'password') {
            // Beispiel: Token erstellen und zurückgeben
            $user = $this->getUser(); // Hier sollte ein UserInterface-Objekt zurückgegeben werden
            $token = $this->jwtManager->create($user);
            return $this->json(['token' => $token]);
        }

        throw new AuthenticationException('Ungültige Anmeldedaten');
    }
} 