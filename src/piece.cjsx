types = Object.keys Reactris.PiecePatterns

class Reactris.Piece
  constructor: ->
    @pos =
      x: (Reactris.bounds.w - 4)/2
      y: Reactris.bounds.h + 4

    @orientation = 0
    @type = types[Math.floor Math.random() * types.length]
    @generateBlocks()

  generateBlocks: ->
    @blocks = []
    pattern = Reactris.PiecePatterns[@type][@orientation]

    for y in [0...4]
      for x in [0...4]
        if pattern[3-y][x]
          @blocks.push new Reactris.Block(@pos.x + x, @pos.y + y)
    return

  canRotate: ->
    newOrientation = @orientation + 1
    newOrientation = 0 if newOrientation >= 4
    pattern = Reactris.PiecePatterns[@type][@orientation]

    for y in [0...4]
      for x in [0...4]
        hasBlock = pattern[3-y][x]
        inBounds = hasBlock && @pos.x+x > 0 && @pos.x+x < Reactris.bounds.w
        hasSpace = inBounds && Reactris.isEmpty(@pos.x + x, @pos.y + y)
        if hasBlock
          return no unless hasSpace

    yes

  rotate: ->
    if @canRotate()
      @orientation++
      @orientation = 0 if @orientation >= 4
      @generateBlocks()

  isFilled: (x, y) ->
    for block in @blocks
      return yes if block.pos.x == x && block.pos.y == y
    no # no blocks found at specified coordinates

  isClearRight: ->
    for block in @blocks
      return no unless block.isClearRight()
    yes # getting here means it's clear


  isClearLeft: ->
    for block in @blocks
      return no unless block.isClearLeft()
    yes # getting here means it's clear

  isClearBottom: ->
    for block in @blocks
      return no unless block.isClearBottom()
    yes # getting here means it's clear

  isOverTop: ->
    for block in @blocks
      return yes if block.pos.y >= Reactris.bounds.h
    no # no block is over the top of the viewport

  moveRight: ->
    if @isClearRight()
      @pos.x++
      for block in @blocks
        block.moveRight()

  moveLeft: ->
    if @isClearLeft()
      @pos.x--
      for block in @blocks
        block.moveLeft()

  moveDown: ->
    @pos.y--
    if @isClearBottom()
      for block in @blocks
        block.moveDown()

  lock: ->
    for block in @blocks
      block.lock()
