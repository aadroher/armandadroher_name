module Main.Components.Home (content) where

import React (ReactElement)
import React.DOM as D
import React.DOM.Props (className)

content :: ReactElement
content = D.div [] [D.h1 [className "title"] [D.text "Armand Adroher"]]