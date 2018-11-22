module Main where

import Prelude

import Main.Components.Page (page)

import Data.Maybe (fromJust)
import Effect (Effect)
import Effect.Console (log)
import Partial.Unsafe (unsafePartial)
import ReactDOM (render)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toNonElementParentNode)
import Web.HTML.Window (document)

main :: Effect Unit
main = void do 
  log "Rendering armandadroher.name"
  let component = page
  doc <- window >>= document
  containter <- getElementById "app" $ toNonElementParentNode doc
  render component (unsafePartial fromJust containter)

  
