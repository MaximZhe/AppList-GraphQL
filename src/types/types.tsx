export interface ISingleCardRepo {
    id: 0,
    owner: {
        avatarUrl: "",
        login: ""
    },
    name: "",
    stargazers: {
        totalCount: 0
    },
    primaryLanguage: {
        name: ""
    },
    description: "",
    pushedAt: "",
    url:"",

}

export interface ICardRepositoryProps {
    node: ISingleCardRepo
}
export interface IInitialState {
    datas: ICardRepositoryProps[];
    singleRepoData: ICardRepositoryProps
}