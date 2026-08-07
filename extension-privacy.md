---
layout: prose
title: Extension privacy policy
eyebrow: Teampass browser extension
lead: >-
  How the Teampass browser extension handles data. Short version: it talks to
  your own server, and nothing reaches ours.
description: >-
  Privacy policy for the Teampass Password Manager browser extension for Chrome,
  Firefox and Edge — what data it handles, what it never collects, and how to
  contact us about it.
---

*Last updated: 2026-05-31*

This Privacy Policy describes how the **Teampass Password Manager** browser
extension (the "Extension") for Microsoft Edge, Google Chrome and Mozilla
Firefox handles user data. The Extension is published by the Teampass project
(the "Publisher", "we", "us") and is designed to act as a client interface to a
self-hosted [Teampass](https://teampass.net) password manager server.

By installing or using the Extension you agree to this Privacy Policy.

---

## 1. Publisher and contact

- **Publisher:** Teampass project — Nils Laumaille
- **Contact:** contact@teampass.net
- **Project website:** https://teampass.net
- **Source code / issue tracker:** https://github.com/nilsteampassnet/teampass-extension

For any privacy-related request (access, rectification, erasure,
portability, restriction, objection), please email
**contact@teampass.net**. We will respond within 30 days.

---

## 2. Single purpose of the Extension

The Extension has a single purpose: to let users securely retrieve,
autofill, create and save credentials stored on **their own
self-hosted Teampass server**, directly from the websites they visit.

The Extension is **not a cloud service**. It does not host any user
vault. All credentials remain on the Teampass server instance
operated by the user or their organisation.

---

## 3. Data we process

### 3.1. Data stored locally on the user's device

The Extension uses the browser's `chrome.storage.local` and
`chrome.storage.session` APIs to persist:

- The **Teampass server URL** and **API key** configured by the user.
- The **short-lived JWT authentication token** issued by the user's
  Teampass server (60 minutes lifetime, renewed automatically).
- **User preferences**: language, theme, search debounce, UI state.
- **Transient encrypted credentials** (AES-GCM 256-bit) used during
  the "save credential" workflow — for example, when a 2FA step
  occurs between submitting a login form and showing the save prompt.
  These are wiped as soon as the workflow completes or the browser
  session ends.

All of this data stays **on the user's device**. None of it is sent
to the Publisher or to any third party.

### 3.2. Data exchanged with the user's Teampass server

When the user performs an action in the Extension (search, autofill,
save, update, delete), the Extension sends an authenticated REST API
request to the **Teampass server URL configured by the user**. This
exchange may include:

- Authentication information (username, password, TOTP, security
  questions, PIN, notes, attached fields).
- The URL/domain of the active tab, used to match credentials.
- Folder identifiers and metadata required by the Teampass API.

The Publisher has **no access** to this traffic. It flows directly
between the user's browser and the user's server.

### 3.3. Data exchanged with the licence server

To verify that the user holds a valid licence, the Extension contacts
the endpoint `https://licence.teampass.net/api/v1.1/`. The following
data is transmitted:

- The **licence key / token** entered by the user.
- The **email address** associated with that licence, where
  applicable.
- The extension **version number** and the **browser family**
  (Chrome / Edge / Firefox).

This data is used **only** to verify the validity of the licence
through an RSA-signed response. It is **not used for profiling,
advertising or analytics**. A 5-day grace period is applied in case
the licence server is unreachable, so the Extension keeps working
offline.

### 3.4. Data we do NOT collect

The Extension does **not** collect or transmit:

- Browsing history or the list of visited pages.
- Page content beyond the username/password fields the user
  interacts with for autofill or save.
- Keystrokes, mouse movements, clicks, scroll position.
- Geolocation data, IP address (beyond what is technically required
  to contact the user's Teampass server and the licence server).
- Health, financial or payment information.
- Personal communications (emails, messages).
- Any analytics, telemetry or crash reports.

---

## 4. Permissions used by the Extension

| Permission | Why it is required |
|---|---|
| `storage` | Persist server URL, JWT token, encrypted transient credentials and user preferences locally. |
| `activeTab` | Read the URL and form fields of the tab the user is currently interacting with, to match and autofill credentials. |
| `clipboardWrite` | Copy a secret (password, TOTP, username) to the clipboard when the user clicks the copy button. The Extension never reads the clipboard. |
| `tabs` | Detect successful logins across multi-step flows (2FA, SSO redirects) so the "save credential" prompt can appear on the correct tab. |
| `<all_urls>` (host permission) | Allow autofill and credential capture on any website the user chooses to log into. |

No permission is used for any purpose other than the one listed above.

---

## 5. Remote code

The Extension does **not** load, execute or evaluate any
remotely-hosted code. All JavaScript shipped with the Extension is
bundled in the package distributed through the Microsoft Edge Add-ons
store (and equivalent stores). A strict Content Security Policy
(`script-src 'self'`) forbids loading external scripts, `eval()` and
inline scripts. External endpoints only return **data** (JSON), never
executable code.

---

## 6. Encryption and security

- Transient credentials stored locally during the save workflow are
  encrypted with **AES-GCM 256-bit** before being written to browser
  storage.
- All network traffic uses **HTTPS** (the Extension refuses plain
  HTTP for the Teampass server URL).
- The JWT authentication token is validated and renewed
  automatically; it is wiped on logout and on browser session end.
- Licence responses are verified using an **RSA signature** to
  prevent tampering.

---

## 7. Data sharing and selling

We **do not sell, rent, trade or transfer** user data to any third
party. We do not use user data for advertising, profiling, credit
scoring or lending purposes. We do not use user data for any purpose
unrelated to the Extension's single purpose described in section 2.

The only network destinations contacted by the Extension are:

1. The **Teampass server URL** configured by the user.
2. The **licence verification endpoint** at
   `https://licence.teampass.net/api/v1.1/`.

---

## 8. Data retention

- Locally stored data (settings, JWT, encrypted transient
  credentials) is kept as long as the Extension is installed and is
  fully removed when the user uninstalls it or clears browser data.
- Licence-related data stored on `licence.teampass.net` is kept for
  the duration of the active subscription and for any legal
  retention period required afterwards. Users can request deletion
  at any time by emailing **contact@teampass.net**.

---

## 9. Children's privacy

The Extension is not directed at children under 16. We do not
knowingly collect data from children.

---

## 10. International transfers

The licence server is operated within the European Union. Data
exchanged with the user's Teampass server is transferred to the
infrastructure chosen by the user or their organisation, and is
subject to that infrastructure's location and policies.

---

## 11. Your rights (GDPR / equivalent)

If you are located in the European Economic Area, the United
Kingdom, Switzerland, California or any jurisdiction granting similar
rights, you may:

- Request **access** to the personal data we hold about you.
- Request **rectification** of inaccurate data.
- Request **erasure** of your data.
- Request **restriction** of processing.
- Request **portability** of your data.
- **Object** to processing.
- Lodge a complaint with your local data protection authority.

Send any such request to **contact@teampass.net**.

---

## 12. Changes to this policy

We may update this Privacy Policy from time to time. Material changes
will be announced through the Extension's release notes and on the
project website. The "Last updated" date at the top of this document
always reflects the latest revision.

---

## 13. Contact

Questions, requests or concerns about this Privacy Policy:
**contact@teampass.net**