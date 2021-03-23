import React, { Component } from 'react'
import './post-list-item.css'

export default class PostListItem extends Component{
    
    render(){
        const {label, onDelete,onToggleLiked,onToggleImportant, important, like} = this.props
        let classNames = 'app-list-item d-flex justify-content-between';
        if (important) {
            classNames+= ' important'
        }
        if (like) {
            classNames+= ' like'
        }
        return(
            <div className={classNames}>
            <span onClick={ onToggleLiked} className="app-list-item-label">
                {label}
            </span>
            <div className="d-flex justify-content-center align-items-center">
                <button type="button" onClick={onToggleImportant } className="btn-star btm-sm">
                    <i className="fa fa-star"></i>
                </button>
                <button type="button" onClick= {onDelete} className="btn-trash btm-sm">
                    <i className="fa fa-trash-o"></i>
                </button>
                <i className="fa fa-heart" ></i>
            </div>
        </div>
        )
    }
}

