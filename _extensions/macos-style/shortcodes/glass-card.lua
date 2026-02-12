-- glass-card shortcode
-- Creates a glass-card styled div element
-- The content is rendered as-is, with styling applied via CSS

function(args, kwargs)
  -- Return a div with the glass-card class
  -- The actual class is added by the Lua filter in filters.lua
  return pandoc.Div({ args }, { id = "glass-card" })
end
