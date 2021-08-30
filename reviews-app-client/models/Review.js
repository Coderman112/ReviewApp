class Review {

    static all = []

    constructor(id, title, content, likes, comments){
        this.id = id
        this.title = title
        this.content = content
        this.likes = likes
        this.comments = [...comments]
    }


    save(){
        Review.all.push(this)
    }


    static fetchReviews(){
        fetch("http://localhost:3000/reviews")
        .then(resp => resp.json())
        .then(json => {
            Review.renderReviews(json)
        })
    }

    static createReview(e){
        e.preventDefault();
        let title = e.target.children[0].value
        let content = e.target.children[1].value


        let params = {
           review: {
                title: title, 
                content: content 
           }
        }

        let configObj = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }

        fetch("http://localhost:3000/reviews", configObj)
        .then(resp => resp.json())
        .then(json => {
            e.target.children[0].value = ""
            e.target.children[1].value = ""
            Review.renderReviews(json)
        })
    }

    static createComment(e){
        e.preventDefault();

        let params = {
           comment: {
               content: e.target.children[0].value,
               review_id: this.id
           }
        }
        let configObj = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }
        fetch(`http://localhost:3000/reviews/${this.id}/comments`, configObj)
        .then(resp => resp.json())
        .then(comments => Review.updateComments(comments))
    }

    static renderReviews(reviewsInfo){
        clearContainer(reviewsContainer())
        Review.all = []
        reviewsInfo.forEach(review => {
            let new_review = new Review(review.id, review.title, review.content, review.likes, review.comments)
            new_review.save();
            let div = document.createElement("div")
            let h4 = document.createElement("h4")
            let p = document.createElement('p')
            let likeButton = document.createElement('button')
            let ul = document.createElement('ul')
            let pLikes = document.createElement('p')
            let deleteButton = document.createElement('button')
            
            let reviewComments = Comment.renderComments(review.comments)
            let form = document.createElement("form")
            let input = document.createElement("input")
            let submitComment = document.createElement("button")
            
            div.id = `div ${review.id}`
            div.style.padding = "20px"
            div.className = 'card'
            h4.innerText = review.title
            h4.id = `title for ${review.id}`
            p.innerText = review.content
            p.id = `content for ${review.id}`
            pLikes.innerText = review.likes
            pLikes.id = `number of likes for ${review.id}`
            ul.id = `comments for ${review.id}`
            likeButton.innerText = "♥"
            likeButton.addEventListener('click', Review.likeReview.bind(review))
            deleteButton.innerText = "x"
            deleteButton.addEventListener("click", Review.deleteReview.bind(review))
            input.type = "text"
            input.placeholder = "Type comment here.."
            submitComment.type = "submit"
            submitComment.innerText = "Submit"
            form.addEventListener("submit", Review.createComment.bind(review))
            form.appendChild(input)
            form.appendChild(submitComment)
            
            div.appendChild(h4)
            div.appendChild(p)
            div.appendChild(pLikes)
            div.appendChild(likeButton)
            div.appendChild(deleteButton)
            reviewComments.forEach(li => ul.appendChild(li))
            div.appendChild(ul)
            div.appendChild(form)

            reviewsContainer().appendChild(div)
        })
    }

    static deleteReview(e){
        let configObj = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        }
        fetch(`http://localhost:3000/reviews/${this.id}`, configObj)
        .then(resp => resp.json())
        .then(json => Review.renderReviews(json))
    }

    static likeReview(e){
        this.likes += 1
        let params = {
            review: {
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

        fetch(`http://localhost:3000/reviews/${this.id}`, configObj)
        .then(resp => resp.json())
        .then(review => Review.updateReview(review))
    }

    static updateReview = (review) => {
        let title = document.getElementById(`title for ${review.id}`)
        let content = document.getElementById(`content for ${review.id}`)
        let likes = document.getElementById(`number of likes for ${review.id}`)
        let comments = () => document.getElementById(`comments for ${review.id}`)
        title.textContent = review.title
        content.textContent = review.content
        likes.textContent = review.likes
        let reviewComments = Comment.renderComments(review.comments)
        clearContainer(comments())
        reviewComments.forEach(li => comments().appendChild(li))
    }

    static updateComments = (comm) => {
        let comments = () => document.getElementById(`comments for ${comm[0].review_id}`)
        let reviewComments = Comment.renderComments(comm)
        clearContainer(comments())
        reviewComments.forEach(li => comments().appendChild(li))
    }


}