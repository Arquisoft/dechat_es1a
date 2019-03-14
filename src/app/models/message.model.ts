import DateTimeFormat = Intl.DateTimeFormat;

export interface Message {
    text: string;
    user: string;
    date: DateTimeFormat;
}
