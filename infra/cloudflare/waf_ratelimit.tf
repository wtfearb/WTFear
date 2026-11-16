# Cloudflare WAF & Ingress Rate Limiting Ruleset for wtfear.agency
# v2.0.0 §3.3 & v3.0.0

resource "cloudflare_rate_limit" "api_audit_rate_limit" {
  zone_id   = var.cloudflare_zone_id
  threshold = 10
  period    = 60

  match {
    request {
      url_pattern = "wtfear.agency/api/audit"
      schemes     = ["HTTPS"]
      methods     = ["POST"]
    }
    response {
      statuses = [200, 201, 400, 422, 500]
    }
  }

  action {
    mode    = "managed_challenge"
    timeout = 300
  }

  description = "Mitigate brute-force audit lead submission and bot spam on /api/audit"
}

resource "cloudflare_rate_limit" "agent_triage_rate_limit" {
  zone_id   = var.cloudflare_zone_id
  threshold = 60
  period    = 60

  match {
    request {
      url_pattern = "api.wtfear.agency/api/v1/agent/*"
      schemes     = ["HTTPS"]
      methods     = ["POST"]
    }
  }

  action {
    mode    = "block"
    timeout = 60
  }

  description = "Protect FastAPI Agent Runtime against unauthenticated volumetric DDoS"
}
