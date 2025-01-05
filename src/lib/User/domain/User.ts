import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";

export class User {
    id: UserId;
    name: UserName;
    email: UserEmail;

    constructor(id: UserId, name: UserName, email: UserEmail) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public mapToDto() {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value
        }
    }
}
