export interface User {
  _id: string;
  name: string;
  email: number;
  mobileNumber?: string;
  emailVerified?: boolean;
  mobileVerified?: boolean;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  favorites?: [];
  rating?: [];
  reviews?: [];
  addresses?: [];
  following?: [];
  follower?: [];
  followingCount?: number;
  followerCount?: number;
  profilePics?: string;
  username?: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
