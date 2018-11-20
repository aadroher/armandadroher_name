module Main where

import Prelude

import Data.Maybe (fromJust)
import Effect (Effect)
import Effect.Console (log)
import Partial.Unsafe (unsafePartial)
import React.DOM as D
import ReactDOM (render)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toNonElementParentNode)
import Web.HTML.Window (document)

main :: Effect Unit
main = void do 
  log "Rendering armandadroher.name"
  let component = D.div [] [ D.text "Hello, sailor" ]
  doc <- window >>= document
  containter <- getElementById "app" (toNonElementParentNode doc)
  render component (unsafePartial fromJust containter)

  
