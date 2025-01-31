export default interface IChat {
  user: string;
  createdAt: Date;
  messages: [{}];
  isActive: boolean;
}
