-- macOS Style Lua Filters
-- Add custom attributes and classes for macOS styling

function Div(el)
  -- Add glass-card class to divs with .glass-card prefix in identifier
  if el.identifier and string.find(el.identifier, "glass%-card") then
    el.classes:insert("glass-card")
  end

  -- Add profile-card class
  if el.identifier and string.find(el.identifier, "profile%-card") then
    el.classes:insert("profile-card")
  end

  -- Add hero-section class
  if el.identifier and string.find(el.identifier, "hero%-section") then
    el.classes:insert("hero-section")
  end

  -- Add quick-nav class
  if el.identifier and string.find(el.identifier, "quick%-nav") then
    el.classes:insert("quick-nav")
  end

  return el
end

-- Process links to add macOS button styling
function Link(el)
  if el.classes:includes("macos-btn") or
     (el.attributes and el.attributes["class"] == "macos-btn") then
    el.classes:insert("macos-btn")
  end
  return el
end

return {Div = Div, Link = Link}
