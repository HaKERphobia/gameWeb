<forum>
    <div>Forum</div>
    <div each="{comment in opts.comment}">
        <img src="{comment.image}" alt="">
        <div>{comment.username}</div>
        <div>{comment.title}</div>
        <div>{comment.content}</div>
        
        <div class="reply_container">

        </div>

        <div>
        <label for="">Title</label>
        <input type="text" class="title2" required>
        <input type="text" class="content2" required>
        <button class="reply_btn">Reply</button>
        </div>
    </div>



    
    <button type="button" class="lol" data-toggle="modal" data-target="#myModal">
        Create post
      </button>
      
      <!-- The Modal -->
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
      
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Create post</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
      
            <!-- Modal body -->
            <div class="modal-body">
              <label for="">Title</label>
              <input type="text" id="title">
              <input type="text" id="content">

            </div>
      
            <!-- Modal footer -->
            <div class="modal-footer">
                <button id="post">Post</button>
              <button type="button" class="1" data-dismiss="modal">Cancel</button>
            </div>
      
          </div>
        </div>
      </div>
</forum>