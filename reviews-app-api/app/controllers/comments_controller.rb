class CommentsController < ApplicationController


    def create
        comment = Comment.new(comment_params)
        if comment.save
            render json: comment.review.comments
        else    
            
        end 
    end 

    def update
        # binding.pry
        comment = Comment.find(params[:id])
        if comment.update(comment_params)
            render json: comment.review.comments
        else

        end 
    end 





private 

def comment_params

    params.require(:comment).permit(:content, :likes, :review_id)
end 

end