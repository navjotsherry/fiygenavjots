export class Features {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    async searchAndPaginate() {
        const currentPage = Number(this.queryStr.page) || 1;
        const mincomplexity = Number(this.queryStr.mincomp) || 0;
        const maxcomplexity = Number(this.queryStr.maxcomp) || 10;
        let limit = Number(this.queryStr.limit) || 10;
        if(this.queryStr.limit>40 || this.queryStr.limit<1){
            limit = 10;
        }
        let builtWhere = {};
        if (this.queryStr.mincomp) {
            builtWhere = { ...builtWhere, complexity: { gte: mincomplexity } };
        }
        if (this.queryStr.maxcomp) {
            builtWhere = { ...builtWhere, complexity: { lte: maxcomplexity } };
        }
        if (this.queryStr.mincomp && this.queryStr.maxcomp) {
            builtWhere = { ...builtWhere, complexity: { gte: mincomplexity, lte: maxcomplexity } };
        }
        if (this.queryStr.keyword) {
            builtWhere = { ...builtWhere, title: { contains: this.queryStr.keyword } };
        }
        const skip = limit * (currentPage - 1);
        this.queryCopy = this.query
        this.query = this.query.findMany({ where: builtWhere, take: limit, skip});
        const resultCount = await this.queryCopy.count()
        this.totalPages = Math.ceil(resultCount/limit)
        return this;
    }
}