module Main where

import Prelude

import Data.Maybe (fromJust)
import Effect (Effect)
import Partial.Unsafe (unsafePartial)
-- import React (pureComponent)
import React as R
import React.DOM as D
import ReactDOM as RDOM
import Web.DOM.NonElementParentNode (getElementById) as DOM
import Web.HTML (window) as DOM
import Web.HTML.HTMLDocument (toNonElementParentNode) as DOM
import Web.HTML.Window (document) as DOM

appElementId :: String
appElementId = "app"

app :: R.ReactClass { }
app = R.statelessComponent "App" $ \_ ->
        D.div 
          [] 
          [ D.h1
            []
            [ D.text "Armand Adroher Salvia"
            ]
          ]

main :: Effect Unit
main = void do
  window <- DOM.window
  document <- DOM.document window
  let node = DOM.toNonElementParentNode document
  appElement <- DOM.getElementById "app" node
  RDOM.render (R.createLeafElement app { }) (unsafePartial fromJust appElement)
  


  
