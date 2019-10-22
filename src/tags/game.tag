<game>

<div class="grid">
    <div class="col-3">
        <ul>
            <li><a href="/game?type=All game">All games</a></li>
            <li><a href="/game?type=type 1">Type 1</a></li>
            <li><a href="/game?type=type 2">Type 2</a></li>
            <li><a href="/game?type=type 3">Type 3</a></li>
        </ul>
    </div>
    <div class="col-9 grid-middle">
        <p class="game_label product_item"><span></span>All games</p>
        <div each="{games in opts.games}" class="col-4">
                <img src="{games.fileUrl[0]}" alt="" class="gameImg">
                <div class="game_name">{games.name}</div>
                <div>{games.discription}</div>
                <div>{games.author}</div>
                <div>{games.rate}</div>
            
                <select name="rate" class="rate">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <button class="rate_button">Rate</button>
            </div>
            
            
            

    </div>
    <div class="grid-right">
            <button id="pre_bt">Pre</button>
            <div>{opts.pageNo}/{opts.pageTotal}</div>
            <button id="next_bt">Next</button>
        </div>
</div>


    
</game>