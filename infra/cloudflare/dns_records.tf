terraform {
  required_version = ">= 1.5.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.40.0"
    }
  }
}

variable "cloudflare_zone_id" {
  type        = string
  description = "Zone ID for wtfear.agency"
}

# 1. Apex and CNAME Records for Next.js 15 Edge Routing
resource "cloudflare_record" "apex_ipv4" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "A"
  value   = "76.76.21.21"
  proxied = true
  ttl     = 1
}

resource "cloudflare_record" "www_cname" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  type    = "CNAME"
  value   = "cname.vercel-dns.com"
  proxied = true
  ttl     = 1
}

# 2. Strict Security CAA Records
resource "cloudflare_record" "caa_letsencrypt" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "CAA"
  data = {
    flags = "0"
    tag   = "issue"
    value = "letsencrypt.org"
  }
}

resource "cloudflare_record" "caa_iodef" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "CAA"
  data = {
    flags = "0"
    tag   = "iodef"
    value = "mailto:security@wtfear.agency"
  }
}

# 3. Email Authentication (SPF, DKIM, DMARC)
resource "cloudflare_record" "spf_txt" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "TXT"
  value   = "v=spf1 include:resend.com ~all"
  ttl     = 3600
}

resource "cloudflare_record" "dmarc_txt" {
  zone_id = var.cloudflare_zone_id
  name    = "_dmarc"
  type    = "TXT"
  value   = "v=DMARC1; p=reject; rua=mailto:dmarc@wtfear.agency; pct=100; aspf=s; adkim=s"
  ttl     = 3600
}
