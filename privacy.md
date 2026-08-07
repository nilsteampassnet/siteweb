---
layout: prose
title: Privacy &amp; cookies
eyebrow: teampass.net
lead: >-
  What this website collects, what it sets on your device, and how to change
  your mind. Short version: audience measurement only, and only if you accept.
description: >-
  Privacy and cookie policy for teampass.net — the Google Analytics 4 audience
  measurement, the cookies it sets, how consent is stored, and how to withdraw
  it.
---

*Last updated: 2026-08-04*

This policy covers the **teampass.net website**. It does not cover the Teampass
software itself: a Teampass server is installed and operated by you, on your own
infrastructure, and the project never sees its data. The browser extension has
its own [privacy policy](/extension-privacy.html).

## What we collect

Nothing at all until you accept audience measurement. The website loads no
advertising, no social widgets, no web fonts and no CDN — apart from the
analytics tag described below, your browser talks to no third party while
reading these pages.

## Audience measurement (Google Analytics 4)

If you press **Accept** in the cookie banner, the site loads Google Analytics 4
(gtag.js) from `googletagmanager.com` and records:

- the pages you visit and the time spent on them,
- the referrer that brought you here,
- approximate location derived from your IP address, coarse device and browser
  information.

The tag runs with Google Consent Mode v2. Advertising storage, ad user data and
ad personalisation are declared **denied** and are never granted: we run no
remarketing, no advertising audiences and no profiling, and we do not sell or
share the data.

If you press **Decline** — or press Escape, or never answer — the Google tag is
**not requested at all**. This is prior blocking, not merely a denied signal:
nothing is fetched from Google, so nothing is sent to Google.

### Cookies

| Cookie | Set by | Purpose | Lifetime |
| --- | --- | --- | --- |
| `_ga` | Google Analytics | Distinguishes one visitor from another | 2 years |
| `_ga_<stream>` | Google Analytics | Keeps the session state | 2 years |

Your consent choice itself is stored in your browser's **local storage** under
the key `tp-consent`, with the value `granted` or `denied`. It is not a cookie
and is never sent to a server.

When you decline after having accepted, the `_ga*` cookies are deleted from your
browser at that moment.

### Data transfers and retention

Google Analytics is operated by Google Ireland Limited, which may transfer data
to Google LLC in the United States under the European Commission's adequacy
decision for the EU–US Data Privacy Framework and the standard contractual
clauses. Google Analytics 4 uses the IP address to derive a coarse location and
does not log or store it.

<!-- TODO(nils): confirm the retention setting in GA4 Admin > Data settings >
     Data retention (2 or 14 months) and state the real figure here. -->
Event-level data is retained for the period configured on the property, after
which it is deleted by Google. Aggregated reports are kept indefinitely.

## Withdrawing or changing your consent

Use the **Cookie preferences** link in the footer of any page. The banner
reappears and your new choice replaces the old one immediately. You can also
clear your browser's site data for teampass.net, which resets the choice.

## Contact form

The contact form on this site is submitted to **Formspree**, which forwards it
to <a href="mailto:{{ site.email }}">{{ site.email }}</a>. Your name, e-mail
address and message pass through Formspree's servers for that purpose. Do not
send credentials or secrets through it — use the
[security policy]({{ site.links.security-policy }}) for anything sensitive.

## Server logs

<!-- TODO(nils): name the host and its log retention once confirmed. -->
The pages are served as static files. The hosting provider keeps standard
technical access logs, which are not used for analytics and which the project
does not process.

## Your rights

Under the GDPR you may request access to, correction of, or erasure of personal
data concerning you, object to its processing, and lodge a complaint with a
supervisory authority — in France, the [CNIL](https://www.cnil.fr). Write to
<a href="mailto:{{ site.email }}">{{ site.email }}</a>.

The data controller is Nils Laumaillé, maintainer of the Teampass project.

## Changes

Any change to this policy is published on this page with a new date at the top.
If a change ever widens what is collected, consent is asked again rather than
carried over.
