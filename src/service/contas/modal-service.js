
export const openCreateOrUpdateModal = (data, item, id) => {
    data.showModal = true;
    if(id != null) {
        data.modalTitle = `Editar - ${item.description}`
        data.account.id = item.id
        data.account.description = item.description
        data.account.initial_amount = item.initial_value
        data.account.type = getOptionValue(data,item)
    }
}

const getOptionValue = (data, item) => {
    for(let i=0;i<=data.accountTypesOptions.length;i++) {
        if(data.accountTypesOptions[i].value === item.type) {
            return data.accountTypesOptions[i];
        }
    }
}

export const openDeleteModal = (data, item, modal) => {
    modal.show()
    data.confirmDeleteMessage = `Deseja deletar ${item.description} ?`;
}

export const openSharedModal = (data, item, modal) => {
    modal.show();
}


export const clearModal = (data) => {
    data.modalTitle = "Criar nova conta"
    data.account.id = null
    data.account.description = null
    data.account.initial_amount = null
    data.account.type = null
}