usuario = {
  roles_do_usuario: [
    {
      id: 1,
      nome: "admin",
      permissoes_da_role: [
        { nome: "criar_usuario" },
        { nome: "deletar_usuario" }
      ]
    },
    {
      id: 2,
      nome: "editor",
      permissoes_da_role: [
        { nome: "editar_post" }
      ]
    }
  ]
}

permissoesNecessarias = ['editar_post'];


const temPermissao = usuario.roles_do_usuario
    .flatMap((role) => role.permissoes_da_role)
    .map((permissao) => permissao.nome)
    .some((permissao) => permissao.includes(permissoesNecessarias))

    console.log(temPermissao);
