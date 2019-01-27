export default class Error {
    constructor(code = undefined) {
        this.code = code;
    }

    toString() {
        switch (this.code) {

        case 'auth/weak-password':
            return 'Le mot de passe doit contenir 6 caractères';
        case 'auth/email-already-in-use':
            return 'Adresse email déjà utilisée';
        case 'auth/invalid-email':
            return 'Adresse email invalide';
        case 'auth/user-disabled':
            return 'Ce compte a été désactivé';
        case 'auth/user-not-found':
            return 'Compte inexistant';
        case 'auth/wrong-password':
            return 'Mot de passe incorrect';
        case undefined:
            return '';
        default:
            return 'Database error: ', this.code;
        }
    }
}