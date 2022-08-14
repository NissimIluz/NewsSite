import { CommentStatus } from "../enums/comment-status";

export interface ArticleComment {
    articleId: string;
    title: string;
    createDate: Date;
    updateDate: Date| string| null;
    author: string;
    contentText:string;
    status: CommentStatus;
    commentFatherId: string| null;
    _id: string;
    numberOfReported: number;
}