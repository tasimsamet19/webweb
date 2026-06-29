$OUTPUT_DIR = ".\public\images\products"

$products = @(
  @{ slug = "gildan-heavy-cotton-tee";           prompt = "professional product photography plain white heavyweight cotton t-shirt neatly folded on white background studio lighting high quality commercial apparel photo" },
  @{ slug = "bella-canvas-unisex-tee";            prompt = "professional product photography soft heather grey premium unisex t-shirt flat lay white background fashion apparel sharp detailed commercial" },
  @{ slug = "next-level-performance-tee";         prompt = "professional product photography navy blue athletic moisture-wicking performance t-shirt on mannequin white background studio lighting sports apparel" },
  @{ slug = "gildan-heavy-blend-hoodie";          prompt = "professional product photography black pullover hoodie with kangaroo pocket drawstring folded white background premium apparel commercial photo" },
  @{ slug = "independent-trading-crewneck";       prompt = "professional product photography charcoal grey crewneck sweatshirt flat lay white background soft studio lighting high quality apparel commercial" },
  @{ slug = "quarter-zip-pullover";               prompt = "professional product photography navy blue quarter-zip pullover on mannequin athletic corporate apparel white studio background sharp commercial" },
  @{ slug = "port-authority-softshell";           prompt = "professional product photography black softshell jacket on mannequin wind-resistant corporate outerwear white background studio lighting commercial" },
  @{ slug = "full-zip-fleece-jacket";             prompt = "professional product photography dark grey full zip fleece jacket on mannequin white studio background sharp commercial apparel photo" },
  @{ slug = "richardson-112-snapback";            prompt = "professional product photography black Richardson 112 trucker snapback hat on white surface studio top lighting sharp detail commercial hat photo" },
  @{ slug = "custom-beanie";                      prompt = "professional product photography dark navy knit cuffed beanie hat folded on white surface soft lighting close-up ribbed knit texture minimal background" },
  @{ slug = "port-authority-pique-polo";          prompt = "professional product photography white pique polo shirt on mannequin corporate uniform collared shirt white background commercial quality photo" },
  @{ slug = "sublimated-basketball-jersey";       prompt = "professional product photography vibrant red black custom sublimated basketball jersey with player number on mannequin sports uniform white studio" },
  @{ slug = "custom-baseball-uniform";            prompt = "professional product photography white pinstripe custom baseball jersey uniform on mannequin classic sports apparel white studio background" },
  @{ slug = "custom-varsity-jacket";              prompt = "professional product photography classic black wool white leather sleeve varsity letterman jacket on mannequin chenille patches white studio background" },
  @{ slug = "custom-tote-bag";                    prompt = "professional product photography natural canvas tote bag standing upright white studio background soft lighting eco reusable bag commercial" },
  @{ slug = "custom-branded-mug";                 prompt = "professional product photography white ceramic coffee mug with logo white marble surface soft studio lighting sharp detail commercial product shot" },
  @{ slug = "create-your-own-sublimated-uniform"; prompt = "professional product photography custom all-over sublimated soccer uniform vibrant gradient design jersey shorts on mannequin bright studio lights" }
)

$total = $products.Count
$i = 0
$ok = 0

foreach ($p in $products) {
  $i++
  $outFile = "$OUTPUT_DIR\$($p.slug).jpg"

  if (Test-Path $outFile) {
    Write-Host "[$i/$total] SKIP: $($p.slug)"
    $ok++
    continue
  }

  $encoded = [System.Uri]::EscapeDataString($p.prompt)
  $url = "https://image.pollinations.ai/prompt/$encoded`?width=800&height=800&nologo=true&model=flux"

  Write-Host "[$i/$total] Generating: $($p.slug)..."

  try {
    Invoke-WebRequest -Uri $url -OutFile $outFile -TimeoutSec 90 -UseBasicParsing
    $size = (Get-Item $outFile).Length
    Write-Host "  -> OK ($([math]::Round($size/1024))KB)"
    $ok++
  } catch {
    Write-Host "  -> FAILED: $_"
    if (Test-Path $outFile) { Remove-Item $outFile }
  }

  Start-Sleep -Seconds 1
}

Write-Host "`nCompleted: $ok/$total images generated."
