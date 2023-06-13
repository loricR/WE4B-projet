export class CommentDTO {
  constructor(
      public content: string,
      public ID_game: number,
      public ID_user: number,
      public note: number,

  ) {
      this.content = content;
      this.ID_game = ID_game;
      this.ID_user = ID_user;
      this.note = note;
  }
}