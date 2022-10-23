export interface GetUserParams {
  // propriedades do usuario do twitter
  username?: string;
  id?: string;
  // propriedade do sistema, caso refresh = true, refaz a pesquisa
  // na API do twitter mesmo que já exista um registro na base
  refresh?: boolean;
}
