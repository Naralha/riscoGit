declare var $: any;
export default function initJsTree() {
  console.log('entrou')
  $('#organogramaTree')
    .jstree({
      core: {
        strings: { 'Loading ...': 'Carregando...' },
        check_callback: true,
        themes: {
          name: 'proton',
          responsive: true,
        },
        data: this.treeData,
      },
      types: {
        default: {
          valid_children: ['default', 'file'],
        },
      },
      plugins: [
        'themes',
        'contextmenu',
        'dnd',
        'state',
        'types',
        'changed',
        'unique',
      ],
      contextmenu: {
        items: ($node) => {
          let tree = $('#organogramaTree').jstree(true);
          return {
            Create: {
              separator_before: false,
              separator_after: false,
              icon: 'plus-square',
              label: 'Novo setor',
              action: () => {
                $node = tree.create_node($node);
                tree.edit($node);
              },
            },
            Rename: {
              separator_before: false,
              separator_after: false,
              icon: 'edit',
              label: 'Renomear setor',
              action: () => {
                tree.edit($node);
              },
            },
            Delete: {
              separator_before: false,
              separator_after: false,
              icon: 'delete',
              label: 'Remover',
              _disabled: () => {
                return $node.parent == '#' ? true : false;
              },
              action: () => {
                tree.delete_node($node);
              },
            },
            AddFuncionario: {
              separator_before: false,
              separator_after: false,
              label: 'Incluir funcionário',
              _disabled: true,
              action: () => {},
            },
          };
        },
      },
    })
    .on('rename_node.jstree', (e, data) => {
      this.onRenameNode(data);
    })
    .on('delete_node.jstree', (e, data) => {
      this.onDeleteNode(data);
    })
    .on('changed.jstree', (e, data) => {
      // const idNode = data.selected[0];
      // if (idNode) {
      //   this.router.navigate(['organograma/tree/detail'], {
      //     queryParams: { id: data.node.id, name: data.node.text },
      //   });
      // }
    });
}
