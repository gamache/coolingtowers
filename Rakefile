CONVERT = ENV['CONVERT'] || 'convert'  ## path to ImageMagick 'convert' command

task :all => [:html, :css, :thumbs]
task :default => [:all]

task :html => [:haml, :gallery, :html_includes]

task :haml => ['index.html']

task :css => ['main.css']

task :html_includes do
  final_html = []
  File.open('index.html', 'r') do |f|
    f.each do |line|
      if m = line.match(/^ \s* <!-- \s* include \s* (.+\.html) \s* --> \s* $/x)
        puts m
        File.open(m[1],'r') {|inc| final_html << inc.read }
      else
        final_html << line
      end
    end
  end
  File.open('index.html', 'w') do |f|
    final_html.each {|line| f.puts line}
  end
end

task :thumbs do
  Dir.glob('pics/*.*').each do |image|
    thumb = image.gsub(/^pics/, 'pics/thumbs')
    medium = image.gsub(/^pics/, 'pics/medium')
    unless File.exists?(thumb)
      sh "#{CONVERT} -define jpeg:size=150x150 '#{image}' -thumbnail 100x100^ "+
         "-gravity center -extent 100x100 '#{thumb}'"
    end
    unless File.exists?(medium)
      sh "#{CONVERT} '#{image}' -resize 940x940 '#{medium}'"
    end
  end
end

task :gallery => [:thumbs] do
  gallery_str = <<-EOT
<div id="controls"></div>
<div id="loading"></div>
<div id="slideshow"></div>
<div id="caption"></div>
<div id="thumbs">
  <ul class="thumbs noscript">
  EOT
  Dir.glob('pics/*.*').each do |image|
    thumb = image.gsub(/^pics/, 'pics/thumbs')
    medium = image.gsub(/^pics/, 'pics/medium')
    gallery_str += <<-EOT
    <li>
      <a class="thumb" name="optionalCustomIdentifier" href="#{medium}">
        <img src="#{thumb}" />
      </a>
      <div class="caption"></div>
    </li>
    EOT
  end
  gallery_str += <<-EOT
  </ul>
</div>
  EOT
  File.open('gallery.html', 'w') {|f| f.puts gallery_str }
end

rule '.css' => ['.css.scss'] do |t|
  sh "scss #{t.source} #{t.name}"
end

rule '.html' => ['.html.haml'] do |t|
  sh "haml #{t.source} #{t.name}"
end


