import React, {
    Component
} from 'react'
import AppHeader from '../app-header/app-header'
import SearchPanel from '../search-panel/search-panel'
import PostStatusFilter from '../post-status-filter/post-status-filter'
import PostList from '../post-list/post-list'
import PostAddForm from '../post-add-form/post-add-form'

import './app.css'
import styled from 'styled-components'


const AppBlock = styled.div `
    margin: 0 auto;
    max-width: 800px;
`

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [{
                    label: 'Post n React 1',
                    important: true,
                    id: Date.now() + Math.random(0.5),
                    like:false
                },
                {
                    label: 'Post n React 2',
                    important: false,
                    id: Date.now() + Math.random(0.5),
                    like:false
                },
                {
                    label: 'Post n React 3',
                    important: false,
                    id: Date.now() + Math.random(0.5),
                    like:false
                },
                {
                    label: 'Post n React 4',
                    important: false,
                    id: Date.now() + Math.random(0.5),
                    like:false
                }
            ],
            term: '',
            filter:'all'
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLiked = this.onToggleLiked.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)
    }

    searchPost(items, term){
        if( term.length ===0){
            return items
        }
        return items.filter((item)=>{
            return item.label.indexOf(term) > -1
        })
    }

    deleteItem(id) {
        this.setState(({
            data
        }) => {
            //const index = data.findIndex(elem => elem.id === id)
            const newArr = data.filter((item) => item.id !== id)
            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        console.log(body)

        const newPost = {
            label: body,
            important: false,
            id: Date.now() + Math.random(0.5)
        }
        this.setState(({
            data
        }) => {
            const newData = [...data, newPost]
            return {
                data: newData
            }
        })
    }
    onToggleImportant(id){
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id)
            const elem = data[index]
            const newElem = {...elem, important: !elem.important}
            const newData = [...data.slice(0, index), newElem, ...data.slice(index+1)]
            return {
                data: newData
            }
        })
    }
    onToggleLiked(id){
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id)
            const elem = data[index]
            const newElem = {...elem, like: !elem.like}
            const newData = [...data.slice(0, index), newElem, ...data.slice(index+1)]
            return {
                data: newData
            }
        })
    }
    onUpdateSearch(term){
        this.setState({term})
    }

    onFilterSelect(filter){
        this.setState({filter})
    }

    

    filterPosts(items, filter){
        if(filter === 'like'){
            return items.filter(item =>item.like)
        }else{
            return items
        }
    }

    render() {

        const liked = this.state.data.filter(item => item.like).length
        const allPosts = this.state.data.length
        const visiblePosts = this.filterPosts(this.searchPost(this.state.data, this.state.term), this.state.filter)

        return ( <AppBlock >
            <h1> < AppHeader allPosts={allPosts} liked={liked} /> </h1> 
            <div className = "search-panel d-flex" >
                <SearchPanel onUpdateSearch={this.onUpdateSearch}/ >
                <PostStatusFilter 
                filter={this.state.filter}
                onFilterSelect={this.onFilterSelect}/>
            </div> 
            <PostList posts = {
                    visiblePosts
                }
                onDelete = {
                    this.deleteItem
                }
                onToggleImportant={this.onToggleImportant}
                onToggleLiked={this.onToggleLiked}
            />

            <PostAddForm onAdd = {
                this.addItem
            }/> 
            </AppBlock>
        )
    }



}