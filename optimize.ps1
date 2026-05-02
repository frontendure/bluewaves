Add-Type -AssemblyName System.Drawing
$srcPath = "c:\Users\ajjma\OneDrive\Desktop\bluewaves\frontend\assets\hero.jpg"
$destPath = "c:\Users\ajjma\OneDrive\Desktop\bluewaves\frontend\assets\hero-optimized.jpg"

$img = [System.Drawing.Image]::FromFile($srcPath)
$newWidth = 1920
$newHeight = [int]($img.Height * ($newWidth / $img.Width))

$bitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$graph = [System.Drawing.Graphics]::FromImage($bitmap)
$graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graph.DrawImage($img, 0, 0, $newWidth, $newHeight)

$encoders = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
$jpegEncoder = $encoders | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]80)

$bitmap.Save($destPath, $jpegEncoder, $encoderParams)

$graph.Dispose()
$bitmap.Dispose()
$img.Dispose()
