# aws-3tier-visualizer

An interactive, animated explainer of the AWS Three-Tier Web Application Architecture for absolute beginners. Ravi's online business lives in a secure AWS "campus"; nine steps build the architecture one layer at a time.

**Features:** 9 progressive steps, one animated inline SVG (viewBox 1400x850), Beginner/Technical modes, auto-play/pause/reset, full traffic-flow animation, AZ 1a failure simulation, architecture summary, searchable glossary, light/dark page theme (diagram stays navy), reduced-motion support.

## Architecture
One VPC `10.0.0.0/16` across two AZs. Per AZ: public web subnet (`10.0.1.0/24`, `10.0.4.0/24`), private app subnet (`.2`, `.5`), private DB subnet (`.3`, `.6`), a Web EC2, an App EC2 and a NAT Gateway. AZ 1a holds the RDS Writer, AZ 1b the RDS Reader. Internet → Internet Gateway → External ALB → Web ASG → Internal ALB → App ASG → RDS. S3 is reached through an IAM role.

## The nine steps
1 Region & VPC · 2 Availability Zones · 3 Subnets · 4 Internet connectivity (IGW, route tables, External ALB) · 5 Web tier (health checks, Web ASG) · 6 App & DB tiers (Internal ALB, App ASG, Writer/Reader, replication, S3, IAM) · 7 NAT Gateway · 8 Security (Security Groups, NACLs, blocked intruder) · 9 VPN & VPC Peering.

## Services and analogies
Region = city · VPC = fenced campus · AZ = building · Subnet = department · IGW = main entrance · Route table = direction board · ALB = receptionist · Web server = front desk · App server = back office · Database = records room · NAT = delivery counter · Security Group = door guard · NACL = floor checkpoint · IAM role = permission card · S3 = warehouse · VPN = secret tunnel · Peering = private road · Auto Scaling = hiring staff.

## Traffic flow
Customer → IGW → External ALB → healthy Web server → Internal ALB → App server → RDS Writer → response back the same path. Private servers reach the internet only through NAT, then the IGW.

## Writer / Reader
The Writer takes all changes and replicates asynchronously to the Reader (read replica), which serves read traffic. A read replica is **not** a Multi-AZ standby; promotion is manual, whereas a Multi-AZ standby fails over automatically.

## Security and high availability
Security Groups (stateful, per instance) and Network ACLs (stateless, per subnet) filter traffic; app and DB tiers stay private. With two AZs, ALB health checks send traffic to the healthy AZ if one fails. Not every component fails over automatically (see Writer / Reader).

## Folder structure
```
aws-3tier-visualizer/
├── index.html
├── css/style.css
├── js/{app,architecture,animations,steps}.js
├── assets/favicon.svg
├── .nojekyll
├── LICENSE
└── README.md
```

## Run locally
```
python3 -m http.server 8000
```
Open http://localhost:8000.

## GitHub Pages
Settings → Pages → Deploy from a branch → main → / (root) → Save.

## Customise
Edit `js/steps.js` for text and glossary, `js/architecture.js` for coordinates, wires and packets (`pk(id, path, emoji, start, end, loopSeconds, step)`), `css/style.css` for themes.

## License
MIT
