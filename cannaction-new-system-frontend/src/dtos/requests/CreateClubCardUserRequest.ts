export default interface CreateClubCardUserRequest {
    cardId: string;
    storeId?: number;
    name?: string;
    lastName?: string;
    birthdate?: string;
    email?: string;
    password?: string;
}