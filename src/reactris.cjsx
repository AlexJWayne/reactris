@Reactris =
  stepTime: 200

  bounds:
    w: 10
    h: 20

  init: ->
    @buildGrid()
    @bindEvents()
    @renderer = new Reactris.Renderer()

    @piece = new Reactris.Piece()
    @timer = setInterval (=> @update()), @stepTime

    @render()
    this

  bindEvents: ->
    document.body.addEventListener 'keydown', (e) =>
      switch String.fromCharCode e.keyCode
        when 'D' then @piece.moveRight()
        when 'A' then @piece.moveLeft()
        when 'S' then @piece.rotate()
    , false

  buildGrid: ->
    @grid = []
    for y in [0...Reactris.bounds.h]
      for x in [0...Reactris.bounds.w]
        @grid[x] ?= []
        @grid[x][y] = no

  showFilled: (x, y) ->
    @isFilled(x, y) || @piece.isFilled(x, y)

  isFilled: (x, y) ->
    @grid[x][y]

  isEmpty: (x, y) ->
    !@grid[x][y]

  forEachCell: (fn) ->
    for y in [0...Reactris.bounds.h]
      for x in [0...Reactris.bounds.w]
        fn x, y, @isFilled(x, y)
    return

  render: ->
    @renderer.render()

  update: ->
    @completeLines()
    @updateActivePiece()
    @render()

  updateActivePiece: ->
    @piece.moveDown()
    if !@piece.isClearBottom()
      @piece.lock()
      @buildGrid() if @piece.isOverTop()
      @piece = new Reactris.Piece

  completeLines: ->
    linesToRemove = []
    for y in [0...Reactris.bounds.h]
      completeLine = yes
      for x in [0...Reactris.bounds.w]
        if @isEmpty x, y
          completeLine = no

      linesToRemove.push y if completeLine

    for line in linesToRemove
      @removeLine line

  removeLine: (line) ->
    @forEachCell (x, y, filled) =>
      if line == y
        @grid[x][y] = no

      else if y > line
        @grid[x][y-1] = @grid[x][y]
