class Comment {

    constructor(id, content, likes, review_id){
        this.id = id
        this.content = content
        this.likes = likes
        this.review_id = review_id
    }

    static likeComment(e){
        this.likes += 1
        let params = {
            comment: {
                likes: this.likes
            }
        }
        let configObj = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }
        fetch(`http://localhost:3000/reviews/${this.review_id}/comments/${this.id}`, configObj)
        .then(resp => resp.json())
        .then(review_comments => Review.updateComments(review_comments))
    }


    static renderComments(comments){
        let reviewComments = comments.map(comment => {
            let li = document.createElement('li')
            let div = document.createElement('div')
            let commentContent = document.createElement('p')
            let commentLikes = document.createElement('p')
            let likeButton = document.createElement('button')
            div.style.padding = "25px"
            div.style.background = "#CCE5FF"
            div.className = "card"
            commentContent.innerText = comment.content
            commentLikes.innerText = comment.likes
            likeButton.innerText = "♥"
            likeButton.addEventListener("click", Comment.likeComment.bind(comment))
            div.appendChild(commentContent)
            div.appendChild(commentLikes)
            div.appendChild(likeButton)
            li.appendChild(div)
            return li
        })
        return reviewComments
    }

}