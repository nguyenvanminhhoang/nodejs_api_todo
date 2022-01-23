const MainModel = require(__path_schemas + "items");

module.exports = {
    create: (item) => {
        return new MainModel(item).save();
    },
    listItems: (params, option) => {
        let sort = {};
        let objWhere = {};
        if(params.keyword) objWhere.name = new RegExp(params.keyword, "i");

        if (params.sortField) {
            sort[params.sortField] = params.sortType;
        }

        if(option.task === "all") {
            return MainModel.find(objWhere).select("name status").sort(sort);
        }
        if(option.task === "one") {
            return MainModel.findById(params.id).select("name status");
        }       
    },
    updateItem: (params, option) => {
        if(option.task === "edit") {
            return MainModel.updateOne({_id: params.id}, params.body);
        }
    },
    deleteItems: (params, option) => {
        if(option.task === "one") {
            return MainModel.deleteOne({_id: params.id});
        }
    }
}
