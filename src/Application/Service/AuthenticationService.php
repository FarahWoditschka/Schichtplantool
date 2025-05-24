<?php

namespace App\Application\Service;

use App\Data\Entity\User;
use App\Data\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use PHPUnit\Util\Json;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

final class AuthenticationService
{
    public function __construct(
        private UserRepository $userRepository,
        private UserPasswordHasherInterface $passwordHasher,
        private JWTTokenManagerInterface $jwtManager,
        private TokenStorageInterface $tokenStorage,
        private UrlGeneratorInterface $urlGenerator
    ) {}

    public function authenticateUser(?string $email, ?string $password): ?JsonResponse
    {
        // alle Daten korrekt?
        if (empty($email) || empty($password)) {
            return new JsonResponse([
                'message' => 'Email und Passwort sind erforderlich'
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $this->userRepository->findOneBy(['email' => $email]);

        // User existiert und Passwort korrekt?
        if (!$user || !$this->passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse([
                'message' => 'Ungültige Anmeldedaten'
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        // User ist verifiziert?
        if (!$user->isVerified()) {
            return new JsonResponse([
                'message' => 'Bitte verifizieren Sie zuerst Ihre E-Mail-Adresse'
            ], JsonResponse::HTTP_FORBIDDEN);
        }

        // Erstelle JWT Token
        $token = $this->jwtManager->create($user);

        // Erstelle den Security Token
        $securityToken = new UsernamePasswordToken(
            $user,
            'main',
            $user->getRoles()
        );
        $this->tokenStorage->setToken($securityToken);
    
        return new JsonResponse([
            'token' => $token,
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'roles' => $user->getRoles()
            ],
        ]);
    }
}   
