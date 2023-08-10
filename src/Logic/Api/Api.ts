namespace Apiv1 {
    export namespace Post {
        export interface Post {
            Title: string;
            Content: string;
            Visible: boolean;
            Tags: string[];
            Date: Date;
            Imagen: string;
            Status: string;
            Author: string;
            Description: string;
            Password: string;
            UrlImageFound?: string;
            Views: number;
            ID: string;
        }
        export interface postFullStructure {
            Performance: boolean;
            Post: Post;
        }
    }
}

export default Apiv1;
