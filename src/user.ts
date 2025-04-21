const axios = require('axios').default;
import { Preferences } from "@capacitor/preferences";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Accept': 'application/json',
        'Allow-Control-Allow-Origin': '*',
    }
});

export default class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _oneSignalId: string;
    private _authToken: string;
    private _projects: Array<any>;
    private _tasks: Array<any>

    constructor(authToken: string){
        this._id = 0;
        this._name = "";
        this._email = "";
        this._oneSignalId = "";
        this._authToken = authToken;
        this._projects = [];
        this._tasks = [];
        this.fetchProfile();
    }
    // Getters
    public get id(): number {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public get email(): string {
        return this._email;
    }
    public get oneSignalId(): string {
        return this._oneSignalId;
    }
    public get authToken(): string {
        return this._authToken;
    }

    // Setters
    public set authToken(value: string) {
        this._authToken = value;
    }
    public set oneSignalId(value: string) {
        this._oneSignalId = value;
    }

    private static async setToken(token: string): Promise<void> {
        await Preferences.set({
            key: 'authToken',
            value: token,
        });
    }


    public static register(email: string, password: string): boolean {
        return api.post('/register', {
            email: email,
            password: password
        }).then((response: any) => {
            console.log(response.data.message);
            return response.data.status;
        }).catch((error: any) => {
            console.error(error);
            return false;
        });
    }
    public static login(email: string, password: string): User | null {
        api.post('/login', {
            email: email,
            password: password
        }).then((response: any) => {
            console.log(response.data.message);
            const token = response.data.token as string;
            this.setToken(token);

            return new User(token);
        }).catch((error: any) => {
            console.error(error);
            return null;
        });
        return null;
    }
    public async fetchProfile() {
        try {
            const response = await api.get('/profile', {
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                }
            });

            console.log(response.data.message);
            this._id = response.data.user.id;
            this._name = response.data.user.name;
            this._email = response.data.user.email;
            this._oneSignalId = response.data.user.one_signal_id;
            this._projects = response.data.user.projects;
            this._tasks = response.data.user.tasks;

            // Save data into Capacitor Preferences
            await Preferences.set({ key: 'userId', value: this._id.toString() });
            await Preferences.set({ key: 'userName', value: this._name });
            await Preferences.set({ key: 'userEmail', value: this._email });
            await Preferences.set({ key: 'userOneSignalId', value: this._oneSignalId });
            await Preferences.set({ key: 'userProjects', value: JSON.stringify(this._projects) });
            await Preferences.set({ key: 'userTasks', value: JSON.stringify(this._tasks) });

        } catch (error) {
            console.error(error);
        }
    }
    public logout(): boolean {
        api.post('/logout', {}, {
            headers: {
                Authorization: `Bearer ${this.authToken}`,
            }
        }).then((response: any) => {
            console.log(response.data.message);
            this._id = 0;
            this._name = "";
            this._email = "";
            this._oneSignalId = "";
            this._authToken = "";
            this._projects = [];
            this._tasks = [];

            Preferences.remove({ key: 'authToken' });
            Preferences.remove({ key: 'userId' });
            Preferences.remove({ key: 'userName' });
            Preferences.remove({ key: 'userEmail' });
            Preferences.remove({ key: 'userOneSignalId' });
            Preferences.remove({ key: 'userProjects' });
            Preferences.remove({ key: 'userTasks' });
            return true;

        }).catch((error: any) => {
            console.log(error);
            return false;
        });
        return false;
    }




}