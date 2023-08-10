
import React from 'react';

export namespace Api {
  export interface Token {
    Email: string;
    Userid: string;
    authority: string;
    exp: number;
    idtoken: string;
  }
  export interface FeedArray {
    Post: Feed[];
  }
  export interface Post {
    Title: string;
    Content: string;
    Visible: boolean;
    Tags: string[];
    Imagen: string;
    Status: string;
    Description: string;
    Password: string;
  }
  export interface ApiPost {
    Post: Post;
  }
  export interface ApiMyUser {
    Username: string;
    FirstName: string;
    LastName: string;
    Permissions: string;
    Email: string;
    ID: string;
    Image: string;
    Password: string;
    Banned: Boolean;
  }
  export interface ApiMyUserCreate {
    Username: string;
    FirstName: string;
    LastName: string;
    Permissions: string;
    Email: string;
    Image: string;
    Password: string;
  }
  export interface ListUsers {
    Status: ApiMyUser[];
  }
  interface Ipaddresslogin {
    UserAgent: string,
    IpAddrs: string,
    Date: string
    Uuidtoken: string
  }
  export interface ipaddresList {
    Session: Ipaddresslogin[];
  }
  export interface ApiMyUserJsonkey {
    Info: ApiMyUser;
  }

  export interface PageResults {
    Title: string;
    Imagen: string;
    Date: string | number | Date;
    Content: string;
    Tags: string[];
    Description: string;
    ID: string;
  }
  export interface ListOfItemsIndexProps {
    Title: string;
    Description: string;
    Tags: string;
    Date: Date;
    id: string;
    type: string;
    stateDrafts: React.Dispatch<React.SetStateAction<FeedArray>>;
    State: FeedArray;
  }
  export interface CardsObj {
    Imagen: string;
    Title: string;
    Content: string;
    Date: string;
    id: string;
  }

  export interface CardProps {
    data: CardsObj;
  }
  export interface Feed {
    Title: string;
    Author: string;
    ID: string;
    Date: Date;
    Imagen: string;
    Description: string;
    Visible: boolean;
  }
}
