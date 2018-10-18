module Main where

import Prelude
import Effect (Effect)
import Data.Maybe (fromJust)
-- import Effect.Console (log)

import Web.HTML (window) as DOM
import Web.HTML.Window (document) as DOM
import Web.HTML.HTMLDocument (toNonElementParentNode) as DOM
import Web.DOM.NonElementParentNode (getElementById) as DOM

import React as R
import React.DOM as RD
-- import React.DOM.Props as RP
import ReactDOM as RDOM

import Partial.Unsafe (unsafePartial)

-- import Thermite as T

app :: R.ReactClass { }
app = R.pureComponent "App" component
  where 
  component this =
    pure { state: { }
         , render: render
         }
    where
    render =
        RD.div 
          [] 
          [ RD.h1
            []
            [ RD.text "Armand Adroher Salvia"
            ]
          ]

main :: Effect Unit
main = void $ do
  window <- DOM.window
  document <- DOM.document window
  let node = DOM.toNonElementParentNode document
  appElement <- DOM.getElementById "app" node
  let appElement' = unsafePartial (fromJust appElement)
  RDOM.render (R.createLeafElement app { }) appElement'


  
