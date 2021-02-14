import { OAuthStorage } from "angular-oauth2-oidc";

export function authStorageFactory() : OAuthStorage {
  return localStorage;
}