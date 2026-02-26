import { dataFetcher } from "../services/DataFetcher";

export async function guestModeCredentialsRequest() {

    const guestCredentials = {
        email: "INVITADO@gmail.com",
        plainPassword: "12345"
    }

    const guestData = await dataFetcher.login(guestCredentials)

    localStorage.setItem('username', guestData.username);
    localStorage.setItem('idUser', guestData.idUser);

    window.location.reload();
}