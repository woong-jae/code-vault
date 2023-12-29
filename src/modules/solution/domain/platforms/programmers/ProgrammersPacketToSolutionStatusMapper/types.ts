export type ProgrammersPacket = Partial<{
  command: string;
  message: {
    type: string;
    passed: boolean;
    msg: string;
  };
  identifier: string;
  data: string;
}>;

export type ProgrammersIdentifier = {
  lesson_id: number;
  language: string;
};

export type ProgrammersCode = {
  codes: {
    [name: string]: string;
  };
};
