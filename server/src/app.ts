import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

app.get('/incidents', (req, res) => {
    try {
        // Read incidents data from JSON file
        const incidentsPath = path.join(__dirname, '../data/incidents.json');
        const incidentsData = JSON.parse(fs.readFileSync(incidentsPath, 'utf8'));
        
        // Get query parameters for pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        
        // Validate pagination parameters
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                error: 'Invalid pagination parameters. Page and limit must be positive integers.'
            });
        }
        
        // Calculate pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const totalIncidents = incidentsData.length;
        const totalPages = Math.ceil(totalIncidents / limit);
        
        // Get paginated data
        const paginatedIncidents = incidentsData.slice(startIndex, endIndex);
        
        // Check if page is out of bounds
        if (startIndex >= totalIncidents && totalIncidents > 0) {
            return res.status(404).json({
                error: 'Page not found. Requested page exceeds available data.'
            });
        }
        
        // Return response with pagination metadata
        res.json({
            data: paginatedIncidents,
            pagination: {
                page,
                limit,
                total: totalIncidents,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
        
    } catch (error) {
        console.error('Error reading incidents data:', error);
        res.status(500).json({
            error: 'Internal server error while fetching incidents data.'
        });
    }
});