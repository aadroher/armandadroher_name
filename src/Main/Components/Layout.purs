module Main.Components.Layout (layout) where
  
import React (ReactElement)
import React.DOM as D
import React.DOM.Props (className)

layout :: ReactElement -> ReactElement
layout c = D.div [className "container"] [c]
